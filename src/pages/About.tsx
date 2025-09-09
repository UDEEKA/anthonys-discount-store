import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
          <p className="text-muted-foreground max-w-3xl">
            We are committed to offering premium premix beverages at the best prices with island-wide delivery
            and reliable customer service.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
