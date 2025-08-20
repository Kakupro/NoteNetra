import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const guarantees = [
    {
      icon: 'Shield',
      title: '30-Day Money Back',
      description: 'Full refund if not satisfied'
    },
    {
      icon: 'Award',
      title: 'ISO 27001 Certified',
      description: 'Enterprise-grade security'
    },
    {
      icon: 'Lock',
      title: 'Bank-Level Encryption',
      description: '256-bit SSL protection'
    },
    {
      icon: 'Users',
      title: '10,000+ MSMEs',
      description: 'Trust NoteNetra daily'
    }
  ];

  const certifications = [
    {
      name: 'RBI Approved',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center',
      description: 'Reserve Bank of India certified payment solution'
    },
    {
      name: 'MSME Registered',
      logo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=120&h=60&fit=crop&crop=center',
      description: 'Officially registered MSME technology provider'
    },
    {
      name: 'ISO 27001',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=120&h=60&fit=crop&crop=center',
      description: 'International security management standard'
    },
    {
      name: 'NASSCOM Member',
      logo: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=120&h=60&fit=crop&crop=center',
      description: 'National Association of Software Companies'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Kumar Electronics, Delhi',
      rating: 5,
      comment: `NoteNetra transformed our business! Credit score improved by 120 points in 8 months. Now we qualify for business loans we never thought possible.`,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Sharma',
      business: 'Sharma Textiles, Mumbai',
      rating: 5,
      comment: `The ROI calculator was spot-on. We're now eligible for ₹15 lakh business loan, exactly as predicted. Best investment for our MSME.`,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Amit Patel',business: 'Patel Trading Co., Ahmedabad',
      rating: 5,
      comment: `Professional plan paid for itself in 3 months. The analytics helped us identify our most profitable products and optimize inventory.`,
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        color={i < rating ? "var(--color-warning)" : "var(--color-border)"}
        fill={i < rating ? "var(--color-warning)" : "none"}
        strokeWidth={1.5}
      />
    ));
  };

  return (
    <div className="space-y-12">
      {/* Guarantees */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {guarantees?.map((guarantee, index) => (
          <div
            key={index}
            className="text-center p-6 bg-card rounded-xl border border-border shadow-card hover:shadow-interactive transition-smooth"
          >
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon
                name={guarantee?.icon}
                size={24}
                color="var(--color-success)"
                strokeWidth={2}
              />
            </div>
            <h4 className="font-semibold text-foreground mb-2">{guarantee?.title}</h4>
            <p className="text-sm text-muted-foreground">{guarantee?.description}</p>
          </div>
        ))}
      </div>
      {/* Certifications */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-foreground mb-2">Trusted & Certified</h3>
          <p className="text-muted-foreground">
            NoteNetra meets the highest standards of security and compliance
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications?.map((cert, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-smooth"
            >
              <div className="w-20 h-12 mx-auto mb-3 bg-muted rounded overflow-hidden">
                <Image
                  src={cert?.logo}
                  alt={cert?.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h5 className="font-semibold text-foreground text-sm mb-1">{cert?.name}</h5>
              <p className="text-xs text-muted-foreground">{cert?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Customer Testimonials */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-foreground mb-2">What Our Customers Say</h3>
          <p className="text-muted-foreground">
            Real results from real MSME businesses across India
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-muted/30 rounded-xl border border-border hover:shadow-card transition-smooth"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial?.rating)}
              </div>

              {/* Comment */}
              <blockquote className="text-muted-foreground mb-4 italic">
                "{testimonial?.comment}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{testimonial?.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial?.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;