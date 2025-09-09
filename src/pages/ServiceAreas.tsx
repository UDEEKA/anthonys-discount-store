import Navbar from '@/components/Navbar';

const ServiceAreas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Service Areas</h1>
          <p className="text-muted-foreground max-w-3xl">
            We provide delivery across Sri Lanka. Coverage: <strong>All Island</strong>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreas;
