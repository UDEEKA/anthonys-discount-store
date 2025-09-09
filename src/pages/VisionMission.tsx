import Navbar from '@/components/Navbar';

const VisionMission = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Vision & Mission</h1>
          <div className="prose prose-sm dark:prose-invert max-w-3xl">
            <h2>Vision</h2>
            <p>To be Sri Lanka's most trusted destination for premium premix beverages.</p>
            <h2>Mission</h2>
            <p>Deliver quality, convenience, and value with island-wide reach and excellent service.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMission;
