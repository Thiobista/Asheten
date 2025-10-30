"use client";

import { FormEvent, useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message");
      }
      setSuccess("Thanks! Your message has been sent.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28 bg-[#0f3b3e] text-white">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mb-12 rounded-xs bg-[#124448] text-white px-8 py-11 shadow-three sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Contact ASHETEN INVESTMENT
              </h2>
              <p className="mb-12 text-base font-medium text-[#cfd8dc]">
                Ready to discuss your business needs? Get in touch with our team for professional consultation and service inquiries.
              </p>
              <form onSubmit={onSubmit} noValidate>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your name"
                        className="border-stroke w-full rounded-xs border border-transparent bg-[#0f3b3e] px-6 py-3 text-base text-white placeholder:text-white/60 outline-hidden focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="border-stroke w-full rounded-xs border border-transparent bg-[#0f3b3e] px-6 py-3 text-base text-white placeholder:text-white/60 outline-hidden focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="Enter your Message"
                        className="border-stroke w-full resize-none rounded-xs border border-transparent bg-[#0f3b3e] px-6 py-3 text-base text-white placeholder:text-white/60 outline-hidden focus:border-[#d4af37]"
                      ></textarea>
                    </div>
                  </div>
                  {(success || error) && (
                    <div className="w-full px-4">
                      {success && (
                        <div className="mb-4 rounded-xs bg-green-600/20 px-4 py-3 text-sm text-green-200">
                          {success}
                        </div>
                      )}
                      {error && (
                        <div className="mb-4 rounded-xs bg-red-600/20 px-4 py-3 text-sm text-red-200">
                          {error}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="w-full px-4">
                    <button disabled={submitting} className="rounded-xs bg-[#d4af37] px-9 py-4 text-base font-medium text-black shadow-submit duration-300 hover:bg-[#c7a330] disabled:opacity-70 disabled:cursor-not-allowed">
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
