'use client';

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We&apos;re here to help and answer any questions you might have about our safety
            protection solutions.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about our products? We&apos;d love to hear from you. Contact us through any of
            the following channels.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full shrink-0">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <a
                  href="mailto:taco01@gatherwell.top"
                  className="text-blue-600 hover:text-blue-700"
                >
                  taco01@gatherwell.top
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full shrink-0">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                <a
                  href="tel:+8613206459796"
                  className="text-blue-600 hover:text-blue-700"
                >
                  +86 13206459796
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full shrink-0">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
                <a
                  href="https://wa.me/8613206459796"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  +86 13206459796
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
