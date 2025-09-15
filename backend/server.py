# from fastapi import FastAPI, APIRouter
# from dotenv import load_dotenv
# from starlette.middleware.cors import CORSMiddleware
# from motor.motor_asyncio import AsyncIOMotorClient
# import os
# import logging
# from pathlib import Path
# from pydantic import BaseModel, Field
# from typing import List
# import uuid
# from datetime import datetime
# from contextlib import asynccontextmanager


# ROOT_DIR = Path(__file__).parent
# load_dotenv(ROOT_DIR / '.env')

# # MongoDB connection
# mongo_url = os.environ['MONGO_URL']
# client = AsyncIOMotorClient(mongo_url)
# db = client[os.environ['DB_NAME']]

# # Lifespan context manager
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     yield
#     client.close()

# # Create the main app without a prefix
# app = FastAPI(lifespan=lifespan)

# # Create a router with the /api prefix
# api_router = APIRouter(prefix="/api")


# # Define Models
# class StatusCheck(BaseModel):
#     id: str = Field(default_factory=lambda: str(uuid.uuid4()))
#     client_name: str
#     timestamp: datetime = Field(default_factory=datetime.utcnow)

# class StatusCheckCreate(BaseModel):
#     client_name: str

# # Add your routes to the router instead of directly to app
# @api_router.get("/")
# async def root():
#     return {"message": "Hello World"}

# @api_router.post("/status", response_model=StatusCheck)
# async def create_status_check(input: StatusCheckCreate):
#     status_dict = input.dict()
#     status_obj = StatusCheck(**status_dict)
#     _ = await db.status_checks.insert_one(status_obj.dict())
#     return status_obj

# @api_router.get("/status", response_model=List[StatusCheck])
# async def get_status_checks():
#     status_checks = await db.status_checks.find().to_list(1000)
#     return [StatusCheck(**status_check) for status_check in status_checks]

# # Include the router in the main app
# app.include_router(api_router)

# app.add_middleware(
#     CORSMiddleware,
#     allow_credentials=True,
#     allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Configure logging
# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
# )
# logger = logging.getLogger(__name__)
    


# app.py
from fastapi import FastAPI, APIRouter, HTTPException, Header, UploadFile, File, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from contextlib import asynccontextmanager

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Env vars
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'mydb')
ADMIN_API_KEY = os.environ.get('ADMIN_API_KEY', 'change-me')
CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*').split(',')

if not mongo_url:
    raise RuntimeError("MONGO_URL not set in .env")

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    client.close()

app = FastAPI(lifespan=lifespan, title="Headless API for React Frontend")

api_router = APIRouter(prefix="/api")

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ----------- Helpers ------------
def require_api_key(x_api_key: Optional[str] = Header(None)):
    if x_api_key != ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")

def now_iso():
    return datetime.utcnow().isoformat()

# ----------- Models ------------
class CategoryBase(BaseModel):
    name: str
    slug: str
    image_url: Optional[str] = None
    parent_id: Optional[str] = None  # for subcategory relation

class Category(CategoryBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)
    updated_at: Optional[str] = None

class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    price: float
    discount: Optional[float] = 0.0
    image_url: Optional[str] = None
    category_id: Optional[str] = None
    subcategory_id: Optional[str] = None
    extra: Optional[dict] = {}

class Product(ProductBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)
    updated_at: Optional[str] = None
    active: bool = True
    stock: Optional[int] = 0

class BlogBase(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    image_url: Optional[str] = None
    author: Optional[str] = "Admin"

class Blog(BlogBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)
    updated_at: Optional[str] = None
    published: bool = True

# ----------- Categories routes ------------
@api_router.post("/categories", response_model=Category, dependencies=[Depends(require_api_key)])
async def create_category(payload: CategoryBase):
    cat = Category(**payload.dict())
    await db.categories.insert_one(cat.dict())
    return cat

@api_router.get("/categories", response_model=List[Category])
async def list_categories(q: Optional[str] = None, skip: int = 0, limit: int = 100):
    query = {}
    if q:
        query["name"] = {"$regex": q, "$options": "i"}
    docs = await db.categories.find(query).skip(skip).limit(limit).to_list(length=limit)
    return [Category(**d) for d in docs]

@api_router.get("/categories/{cat_id}", response_model=Category)
async def get_category(cat_id: str):
    doc = await db.categories.find_one({"id": cat_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Category not found")
    return Category(**doc)

@api_router.put("/categories/{cat_id}", response_model=Category, dependencies=[Depends(require_api_key)])
async def update_category(cat_id: str, payload: CategoryBase):
    payload_dict = payload.dict()
    payload_dict["updated_at"] = now_iso()
    res = await db.categories.update_one({"id": cat_id}, {"$set": payload_dict})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    doc = await db.categories.find_one({"id": cat_id})
    return Category(**doc)

@api_router.delete("/categories/{cat_id}", dependencies=[Depends(require_api_key)])
async def delete_category(cat_id: str):
    res = await db.categories.delete_one({"id": cat_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"deleted": True, "id": cat_id}

# ----------- Products routes ------------
@api_router.post("/products", response_model=Product, dependencies=[Depends(require_api_key)])
async def create_product(payload: ProductBase):
    prod = Product(**payload.dict())
    await db.products.insert_one(prod.dict())
    return prod

@api_router.get("/products", response_model=List[Product])
async def list_products(q: Optional[str] = None, category_id: Optional[str] = None, skip: int = 0, limit: int = 100):
    query = {}
    if q:
        query["name"] = {"$regex": q, "$options": "i"}
    if category_id:
        query["category_id"] = category_id
    docs = await db.products.find(query).skip(skip).limit(limit).to_list(length=limit)
    return [Product(**d) for d in docs]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    doc = await db.products.find_one({"id": product_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**doc)

@api_router.put("/products/{product_id}", response_model=Product, dependencies=[Depends(require_api_key)])
async def update_product(product_id: str, payload: ProductBase):
    payload_dict = payload.dict()
    payload_dict["updated_at"] = now_iso()
    res = await db.products.update_one({"id": product_id}, {"$set": payload_dict})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    doc = await db.products.find_one({"id": product_id})
    return Product(**doc)

@api_router.delete("/products/{product_id}", dependencies=[Depends(require_api_key)])
async def delete_product(product_id: str):
    res = await db.products.delete_one({"id": product_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"deleted": True, "id": product_id}

# ----------- Blogs routes ------------
@api_router.post("/blogs", response_model=Blog, dependencies=[Depends(require_api_key)])
async def create_blog(payload: BlogBase):
    blog = Blog(**payload.dict())
    await db.blogs.insert_one(blog.dict())
    return blog

@api_router.get("/blogs", response_model=List[Blog])
async def list_blogs(q: Optional[str] = None, skip: int = 0, limit: int = 100):
    query = {}
    if q:
        query["title"] = {"$regex": q, "$options": "i"}
    docs = await db.blogs.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
    return [Blog(**d) for d in docs]

@api_router.get("/blogs/{blog_id}", response_model=Blog)
async def get_blog(blog_id: str):
    doc = await db.blogs.find_one({"id": blog_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Blog not found")
    return Blog(**doc)

@api_router.put("/blogs/{blog_id}", response_model=Blog, dependencies=[Depends(require_api_key)])
async def update_blog(blog_id: str, payload: BlogBase):
    payload_dict = payload.dict()
    payload_dict["updated_at"] = now_iso()
    res = await db.blogs.update_one({"id": blog_id}, {"$set": payload_dict})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    doc = await db.blogs.find_one({"id": blog_id})
    return Blog(**doc)

@api_router.delete("/blogs/{blog_id}", dependencies=[Depends(require_api_key)])
async def delete_blog(blog_id: str):
    res = await db.blogs.delete_one({"id": blog_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"deleted": True, "id": blog_id}

# A small health / root
@api_router.get("/", tags=["health"])
async def api_root():
    return {"status": "ok", "time": now_iso()}

app.include_router(api_router)

# ready
logger.info("API ready")
