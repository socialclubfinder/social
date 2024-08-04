// components/GrowingGuide.js
import Image from 'next/image';

const GrowingGuide = () => {
  return (
    <div className="p-4 md:p-8 lg:p-16 bg-gray-100">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-green-700 mb-8">Guide to Growing Cannabis</h1>

        {/* Germination Phase */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">1. Germination</h2>
          <div className="flex flex-col md:flex-row items-center">
            <Image 
              src="/images/germination.png" 
              alt="Germination Process" 
              width={500} 
              height={200} 
              className="w-full md:w-1/2 h-auto mb-4 md:mb-0"
            />
            <p className="text-gray-700 md:ml-4">
              Start by soaking cannabis seeds in water for 24-48 hours. After soaking, place the seeds on a damp paper towel and keep them in a warm, dark place. Within a few days, the seeds will sprout and a small taproot will emerge. Once the taproot is about 1/4 inch long, it&#39;s time to plant the seeds.
            </p>
          </div>
        </section>

        {/* Planting the Seed */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">2. Planting the Seed</h2>
          <div className="flex flex-col md:flex-row items-center">
            <Image 
              src="/images/seedling.png" 
              alt="Planting the Seed" 
              width={500} 
              height={300} 
              className="w-full md:w-1/2 h-auto mb-4 md:mb-0"
            />
            <p className="text-gray-700 md:ml-4">
              Plant the germinated seed about 1/2 inch deep into moist soil or a growing medium. Ensure the seed is placed with the taproot facing down. Keep the soil moist but not waterlogged, and provide warmth and light to encourage growth.
            </p>
          </div>
        </section>

        {/* Vegetative Phase */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">3. Vegetative Phase</h2>
          <div className="flex flex-col md:flex-row items-center">
            <Image 
              src="/images/growingstage.png" 
              alt="Vegetative Phase" 
              width={500} 
              height={300} 
              className="w-full md:w-1/2 h-auto mb-4 md:mb-0"
            />
            <p className="text-gray-700 md:ml-4">
              During the vegetative phase, the plant focuses on growing leaves and stems. Provide 18-24 hours of light daily and ensure the plant receives proper nutrients. Prune and train the plant to encourage a strong structure and optimize light exposure.
            </p>
          </div>
        </section>

        {/* Flowering Phase */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">4. Flowering Phase</h2>
          <div className="flex flex-col md:flex-row items-center">
            <Image 
              src="/images/flowering.png" 
              alt="Flowering Phase" 
              width={500} 
              height={300} 
              className="w-full md:w-1/2 h-auto mb-4 md:mb-0"
            />
            <p className="text-gray-700 md:ml-4">
              Transition to a 12-hour light/dark cycle to induce flowering. During this phase, the plant will produce flowers (buds). Maintain proper humidity and temperature, and monitor for pests or diseases. Ensure adequate nutrients and water for optimal flower development.
            </p>
          </div>
        </section>

        {/* Harvest */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">5. Harvest</h2>
          <div className="flex flex-col md:flex-row items-center">
            <Image 
              src="/images/floweringclock.png" 
              alt="Harvesting Cannabis" 
              width={500} 
              height={300} 
              className="w-full md:w-1/2 h-auto mb-4 md:mb-0"
            />
            <p className="text-gray-700 md:ml-4">
              Harvest the buds when trichomes (tiny resin glands) are milky white or amber. Use clean, sharp scissors or pruning shears to cut the branches. Handle the buds carefully to avoid damaging them.
            </p>
          </div>
        </section>

        {/* Curing */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">6. Curing</h2>
          <div className="flex flex-col md:flex-row items-center">
            <Image 
              src="/images/curing.png" 
              alt="Curing Cannabis" 
              width={500} 
              height={300} 
              className="w-full md:w-1/2 h-auto mb-4 md:mb-0"
            />
            <p className="text-gray-700 md:ml-4">
              After harvesting, hang the buds in a dark, well-ventilated area to dry. Once dry, place the buds in airtight jars and open them daily for a few minutes to allow moisture to escape. This process, called curing, enhances flavor and potency.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GrowingGuide;
