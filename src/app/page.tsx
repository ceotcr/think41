export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Appointment Booking App</h1>
      <p className="mt-4 text-lg">
        Navigate to the <a href="/book" className="text-blue-600 underline">Booking Page</a> to get started.
      </p>
    </main>
  );
}
