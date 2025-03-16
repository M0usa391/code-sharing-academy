
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedPosts from "../components/FeaturedPosts";
import Footer from "../components/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Display welcome toast to first-time visitors
    const hasVisited = localStorage.getItem("visited");
    if (!hasVisited) {
      setTimeout(() => {
        toast({
          title: "Welcome to CodeShare Academy!",
          description: "Discover, share and learn with our developer community.",
          duration: 5000,
        });
        localStorage.setItem("visited", "true");
      }, 2000);
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <FeaturedPosts />
        
        <section className="py-16 bg-secondary/30">
          <div className="container-content">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Why Join CodeShare Academy?
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Our platform is designed to help developers at all levels improve their skills, 
                build their portfolio, and connect with a supportive community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-foreground/70">
                  Connect with thousands of developers around the world who share your passion.
                </p>
              </div>
              
              <div className="card p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Knowledge</h3>
                <p className="text-foreground/70">
                  Access a vast library of code snippets, tips, and solutions to common problems.
                </p>
              </div>
              
              <div className="card p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Feedback</h3>
                <p className="text-foreground/70">
                  Receive constructive feedback on your code from experienced developers.
                </p>
              </div>
              
              <div className="card p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Growth</h3>
                <p className="text-foreground/70">
                  Improve your skills and advance your career through continuous learning and practice.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a href="/register" className="btn-primary">
                Join Our Community
              </a>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-content">
            <div className="bg-primary/10 rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to share your code with the world?
                </h2>
                <p className="text-foreground/70 mb-8">
                  Join thousands of developers who are already sharing their knowledge and learning from each other.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/register" className="btn-primary">
                    Get Started
                  </a>
                  <a href="/explore" className="btn-secondary">
                    Explore First
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
