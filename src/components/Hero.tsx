
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Users, Zap } from "lucide-react";

const Hero = () => {
  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <div className="container-content">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span>Discover the future of code sharing</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Share Your Code.
              <br />
              <span className="text-primary">Grow Together.</span>
            </h1>
            
            <p className="text-foreground/70 text-lg md:text-xl max-w-xl">
              Join a community of developers sharing knowledge, code snippets, and programming tips to help each other build better software.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="btn-primary">
                Join The Community
              </Link>
              <Link to="/explore" className="btn-secondary">
                Explore Resources
              </Link>
            </div>
            
            <div className="pt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">5,000+</p>
                <p className="text-sm text-foreground/70">Code Snippets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">2,500+</p>
                <p className="text-sm text-foreground/70">Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">120+</p>
                <p className="text-sm text-foreground/70">Contributors</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 animate-fade-in animate-delay-200">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-xl opacity-50"></div>
              <div className="glass rounded-2xl shadow-xl relative">
                <div className="flex items-center space-x-2 p-4 border-b border-white/20">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs font-mono bg-white/10 rounded-md px-2 py-1 flex-1 text-center">
                    codeshare-academy.com
                  </div>
                </div>
                <div className="p-6 font-mono text-sm overflow-hidden">
                  <pre className="language-javascript">
                    <code className="text-left">
                      <span className="text-blue-500">function</span> <span className="text-amber-500">createAwesomeProject</span>() {`{`}
                      {"\n"}  <span className="text-purple-500">const</span> technologies = [<span className="text-emerald-400">'React'</span>, <span className="text-emerald-400">'Node.js'</span>, <span className="text-emerald-400">'Supabase'</span>];
                      {"\n"}  <span className="text-purple-500">const</span> developers = getTeam();
                      {"\n"}  <span className="text-purple-500">const</span> coffeeConsumed = <span className="text-amber-400">Infinity</span>;
                      {"\n"}
                      {"\n"}  <span className="text-blue-500">if</span> (developers.<span className="text-amber-500">motivation</span> {">"} <span className="text-amber-400">9000</span>) {`{`}
                      {"\n"}    <span className="text-pink-500">return</span> <span className="text-emerald-400">'Amazing software'</span>;
                      {"\n"}  {`}`} <span className="text-blue-500">else</span> {`{`}
                      {"\n"}    <span className="text-amber-500">consumeCoffee</span>(coffeeConsumed);
                      {"\n"}    <span className="text-amber-500">joinCodeShareAcademy</span>();
                      {"\n"}    <span className="text-pink-500">return</span> <span className="text-emerald-400">'Even better software!'</span>;
                      {"\n"}  {`}`}
                      {"\n"}{`}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-6 animate-slide-up animate-delay-100">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Share Code Snippets</h3>
            <p className="text-foreground/70">
              Post your useful code snippets, get feedback, and improve your code quality through community insights.
            </p>
          </div>
          
          <div className="card p-6 animate-slide-up animate-delay-200">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Join The Community</h3>
            <p className="text-foreground/70">
              Connect with like-minded developers, discuss trends, and collaborate on challenging problems.
            </p>
          </div>
          
          <div className="card p-6 animate-slide-up animate-delay-300">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Learn & Grow</h3>
            <p className="text-foreground/70">
              Access tutorials, resources, and best practices shared by experts to accelerate your development skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
