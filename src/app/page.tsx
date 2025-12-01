import ClientApp from "@/components/ClientApp";

const Page = () => {
  return (
    <main>
      <ClientApp
        header={
          <header className="mx-auto w-1/2 space-y-6 px-6 pt-16 pb-12 text-center">
            <h1 className="text-5xl font-extrabold">WhatsApp Chat Analytics</h1>
            <p className="text text-lg">
              Discover hidden patterns in your WhatsApp conversations. Upload
              your chat and get instant insights, all processed locally on your
              device.
            </p>
          </header>
        }
      />
    </main>
  );
};

export default Page;
