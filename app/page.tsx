import Greet from "./greet";
import PdfUploader from "./uploader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Greet />
      <PdfUploader />
    </main>
  );
}
