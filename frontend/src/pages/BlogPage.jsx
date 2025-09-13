import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  BookOpen,
  Shield,
  Users,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Scale
} from 'lucide-react';
import { rulesAndGuidelines } from '../data/blogContent';

const BlogPage = () => {
  const [activeSection, setActiveSection] = useState('basic-rules');

  const sectionIcons = {
    'basic-rules': Shield,
    'user-reviews': Star,
    'shop-reviews': Users,
    'product-reviews': CheckCircle,
    'updates': AlertTriangle
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2">
              <Scale className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">
                User Rules and Guidelines
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please read and understand our community guidelines to ensure a safe, respectful, and valuable experience for all users.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Last Updated: {rulesAndGuidelines.lastUpdated}</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700">
                Mandatory Reading
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Table of Contents
                </h3>
                <nav className="space-y-2 overflow-x-auto">
                  {rulesAndGuidelines.sections.map((section) => {
                    const Icon = sectionIcons[section.id];
                    return (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? 'default' : 'ghost'}
                        className="w-auto justify-start text-sm"
                        onClick={() => scrollToSection(section.id)}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {section.title}
                      </Button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {rulesAndGuidelines.sections.map((section, sectionIndex) => {
                const Icon = sectionIcons[section.id];
                return (
                  <Card key={section.id} id={section.id} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Icon className="h-6 w-6 mr-3 text-blue-600" />
                        {sectionIndex + 1}. {section.title}
                      </h2>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {section.rules.map((rule, ruleIndex) => (
                          <div key={ruleIndex} className="border-l-4 border-blue-200 pl-4 py-2">
                            <div className="flex items-start space-x-3">
                              <Badge 
                                variant="secondary" 
                                className="bg-blue-100 text-blue-700 font-mono text-xs mt-1 flex-shrink-0"
                              >
                                {rule.number}
                              </Badge>
                              <div className="space-y-2 flex-1">
                                <h3 className="font-semibold text-gray-900">
                                  {rule.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                  {rule.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Important Notice */}
              <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <h3 className="font-bold text-red-900">
                        Important Notice
                      </h3>
                      <p className="text-red-800">
                        <strong>By using this platform, you acknowledge that you have read, understood, and agree to abide by these rules and guidelines.</strong> Violation of these terms may result in account suspension or termination without prior notice.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      Questions or Concerns?
                    </h3>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                      If you have any questions about these rules and guidelines, or need to report a violation, please don't hesitate to contact our support team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Contact Support
                      </Button>
                      <Button variant="outline">
                        Report Violation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;