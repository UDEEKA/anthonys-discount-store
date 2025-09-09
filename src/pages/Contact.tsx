import Navbar from '@/components/Navbar';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-3xl">
            Reach us via phone or WhatsApp anytime. We provide 24/7 support.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
