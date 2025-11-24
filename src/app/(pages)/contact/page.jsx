"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main>
        {/* 1. Hero / Header Section */}
        <section className="bg-muted  p-8 md:p-12 overflow-hidden relative  border border-border py-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold  mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about our gadgets? Need support? We are here to help.
            Reach out to us and we well get back to you shortly.
          </p>
        </section>

        <section className="container mx-auto px-4 py-16 -mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 2. Contact Information (Left Side) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Info Cards */}
              <div className="bg-muted p-6 rounded-2xl shadow-lg border border-border flex items-start gap-4">
                <div className="p-3 bg-muted text-primary rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Our Location</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Level 4, Gadget Tower, <br /> Banani, Dhaka-1213
                  </p>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-2xl shadow-lg border border-border flex items-start gap-4">
                <div className="p-3 bg-muted text-primary rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Phone Number</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    +880 1700 000000 <br /> +880 1900 000000
                  </p>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-2xl shadow-lg border border-border flex items-start gap-4">
                <div className="p-3 bg-muted text-primary rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Address</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    support@gadgetgalaxy.com <br /> sales@gadgetgalaxy.com
                  </p>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-2xl shadow-lg border border-border flex items-start gap-4">
                <div className="p-3 bg-muted text-primary rounded-full">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Working Hours</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Mon - Fri: 10AM - 8PM <br /> Sat: 10AM - 4PM
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Contact Form (Right Side) */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-2xl overflow-hidden h-full">
                <CardContent className="p-8 md:p-10">
                  {isSent ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in">
                      <div className="w-20 h-20 bg-muted text-green-600 rounded-full flex items-center justify-center mb-6">
                        <Send className="w-10 h-10" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">
                        Message Sent!
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        Thank you for contacting us. We will reply to your email
                        shortly.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-6"
                        onClick={() => setIsSent(false)}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            required
                            className="h-12 bg-gray-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className="h-12 bg-gray-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Order Inquiry / Product Support"
                          required
                          className="h-12 bg-gray-50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="How can we help you today?"
                          className="min-h-[150px] bg-muted resize-none p-4"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 text-lg font-medium bg-muted hover:bg-muted text-muted-foreground"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 4. Map Section (Google Maps Embed) */}
          <div className="mt-20 rounded-3xl overflow-hidden shadow-lg border border-border h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58144.75383547597!2d88.56496055963866!3d24.379664359655806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa96a38d031%3A0x10f93a950ed6f410!2sRajshahi!5e0!3m2!1sen!2sbd!4v1763923126100!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}
