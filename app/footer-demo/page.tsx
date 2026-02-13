import Footer from '@/components/layout/footer'
import exampleData from '@/lib/footer-data'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-serif font-bold mb-6">Footer Demo</h1>
        <p className="text-zinc-400 mb-8">This page demonstrates the Footer boilerplate with example data.</p>

        <section className="mb-24">
          <div className="bg-zinc-900 rounded p-8 text-zinc-200">
            <h2 className="text-2xl mb-4">Preview</h2>
            <p className="text-sm">Scroll down to see the footer rendered with newsletter and featured links.</p>
          </div>
        </section>
      </div>

      <Footer {...exampleData} />
    </main>
  )
}
