import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestimonialSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      business: 'Kumar Electronics',
      location: 'Mumbai, Maharashtra',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      quote: `NoteNetra transformed my small electronics shop into a digital powerhouse. The device automatically tracks every cash transaction, and I got my first business loan approved within 2 weeks based on the credit score it generated.`,
      results: {
        creditScore: '+180 points',
        loanAmount: '₹5,00,000',
        timeToApproval: '14 days'
      },
      videoThumbnail: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      business: 'Sharma Textiles',
      location: 'Jaipur, Rajasthan',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      quote: `The automated invoicing feature saved me 3 hours daily. My customers love receiving professional invoices instantly via WhatsApp. The ONDC integration helped me reach customers across India.`,
      results: {
        timeSaved: '3 hours/day',
        revenueIncrease: '+45%',
        newCustomers: '2,500+'
      },
      videoThumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      business: 'Ali Spices & Groceries',
      location: 'Hyderabad, Telangana',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      rating: 5,
      quote: `Being a traditional grocery store owner, I was hesitant about technology. But NoteNetra made it so simple. Now I have a complete digital record of all transactions and my credit score improved dramatically.`,
      results: {
        transactionsTracked: '10,000+',
        creditImprovement: '+220 points',
        loanInterestReduction: '2.5%'
      },
      videoThumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    }
  ];

  const industryStats = [
    { industry: 'Retail & Electronics', businesses: '15,000+', avgGrowth: '35%' },
    { industry: 'Textiles & Fashion', businesses: '8,500+', avgGrowth: '42%' },
    { industry: 'Food & Groceries', businesses: '12,000+', avgGrowth: '28%' },
    { industry: 'Services & Repair', businesses: '6,200+', avgGrowth: '38%' }
  ];

  const currentTestimonial = testimonials?.[activeTestimonial];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto content-spacing">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Users" size={16} strokeWidth={2} />
            <span>Success Stories</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Real MSMEs, Real Results
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how Indian small business owners are transforming their operations and accessing better financial opportunities with NoteNetra.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden mb-16">
          <div className="grid lg:grid-cols-2">
            {/* Video/Image Section */}
            <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 p-8 flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src={currentTestimonial?.videoThumbnail}
                  alt={`${currentTestimonial?.name} testimonial`}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg hover:bg-black/30 transition-micro group">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-interactive group-hover:scale-105 transition-micro">
                    <Icon name="Play" size={24} color="white" strokeWidth={2} />
                  </div>
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(currentTestimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} color="var(--color-warning)" fill="var(--color-warning)" strokeWidth={0} />
                ))}
              </div>
              
              <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                "{currentTestimonial?.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src={currentTestimonial?.avatar}
                  alt={currentTestimonial?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{currentTestimonial?.name}</div>
                  <div className="text-sm text-muted-foreground">{currentTestimonial?.business}</div>
                  <div className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Icon name="MapPin" size={12} strokeWidth={2} />
                    <span>{currentTestimonial?.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Results */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(currentTestimonial?.results)?.map(([key, value], index) => (
                  <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">{value}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center space-x-4 mb-16">
          {testimonials?.map((testimonial, index) => (
            <button
              key={testimonial?.id}
              onClick={() => setActiveTestimonial(index)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-micro ${
                activeTestimonial === index
                  ? 'bg-primary text-primary-foreground shadow-interactive'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Image
                src={testimonial?.avatar}
                alt={testimonial?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-left hidden sm:block">
                <div className="text-sm font-medium">{testimonial?.name}</div>
                <div className="text-xs opacity-80">{testimonial?.business}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Industry Statistics */}
        <div className="bg-gradient-to-br from-success/5 to-primary/5 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Trusted Across Industries</h3>
            <p className="text-muted-foreground">
              Over 42,000+ MSMEs across India trust NoteNetra for their digital transformation journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryStats?.map((stat, index) => (
              <div key={index} className="bg-card rounded-xl shadow-card border border-border p-6 text-center hover:shadow-interactive transition-smooth hover-lift">
                <h4 className="font-semibold text-foreground mb-2">{stat?.industry}</h4>
                <div className="text-2xl font-bold text-primary mb-1">{stat?.businesses}</div>
                <div className="text-sm text-muted-foreground mb-3">Active Businesses</div>
                <div className="inline-flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs">
                  <Icon name="TrendingUp" size={12} strokeWidth={2} />
                  <span>+{stat?.avgGrowth} growth</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Join Thousands of Successful MSMEs?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your digital transformation journey today and unlock new growth opportunities for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              iconName="ShoppingCart"
              iconPosition="left"
              className="transition-micro hover-lift"
            >
              Order Your Device
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              className="transition-micro hover-lift"
            >
              Schedule Demo Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;