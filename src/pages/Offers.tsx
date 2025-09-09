import Navbar from '@/components/Navbar';

const Offers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Offers</h1>
          <p className="text-muted-foreground max-w-3xl">
            Check back soon for special promotions and discounts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Offers;
