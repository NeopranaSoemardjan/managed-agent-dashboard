import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Lang = "id" | "en";

type Msg = { side: "in" | "out"; text: string };
type Plan = {
  name: string;
  m: number;
  a: number;
  items: string[];
  featured?: boolean;
};
interface LangCopy {
  pricing: {
    eyebrow: string;
    title: string;
    sub: string;
    monthly: string;
    annual: string;
    per: string;
    startFree: string;
    pick: string;
    plans: Plan[];
    popular: string;
  };
  footer: {
    clevio: string;
    dukungan: string;
    perusahaan: string;
    legal: string;
    copyright: string;
    systems: string;
    links: Record<string, string>;
  };
}

const COPY: Record<Lang, LangCopy> = {
  id: {
    pricing: {
      eyebrow: "Harga",
      title: "Harga sederhana.",
      sub: "Mulai gratis. Tingkatkan kapan saja.",
      monthly: "Bulanan",
      annual: "Tahunan · hemat 20%",
      per: "/bln",
      startFree: "Mulai gratis",
      pick: "Pilih paket",
      plans: [
        {
          name: "Starter",
          m: 0,
          a: 0,
          items: ["1 asisten AI", "500 pesan / bulan", "Dukungan email"],
        },
        {
          name: "Growth",
          m: 299,
          a: 239,
          items: [
            "5 asisten AI",
            "10.000 pesan / bulan",
            "Integrasi dokumen",
            "Dukungan prioritas",
          ],
          featured: true,
        },
        {
          name: "Business",
          m: 999,
          a: 799,
          items: [
            "Asisten tak terbatas",
            "Pesan tak terbatas",
            "SLA & onboarding",
          ],
        },
      ],
      popular: "Populer",
    },
    footer: {
      clevio: "Clevio",
      dukungan: "Dukungan",
      perusahaan: "Perusahaan",
      legal: "Legal",
      links: {
        solusi: "Solusi",
        cara: "Cara kerja",
        harga: "Harga",
        faq: "FAQ",
        kontak: "Hubungi kami",
        status: "Status sistem",
        tentang: "Tentang",
        karier: "Karier",
        hubungi: "Kontak",
        privasi: "Privasi",
        ketentuan: "Ketentuan",
        keamanan: "Keamanan",
      },
      copyright: "Dibuat di Indonesia.",
      systems: "Semua sistem normal",
    },
  },
  en: {
    pricing: {
      eyebrow: "Pricing",
      title: "Simple pricing.",
      sub: "Start free. Upgrade anytime.",
      monthly: "Monthly",
      annual: "Annual · save 20%",
      per: "/mo",
      startFree: "Start free",
      pick: "Choose plan",
      plans: [
        {
          name: "Starter",
          m: 0,
          a: 0,
          items: ["1 AI assistant", "500 messages / month", "Email support"],
        },
        {
          name: "Growth",
          m: 299,
          a: 239,
          items: [
            "5 AI assistants",
            "10,000 messages / month",
            "Document integration",
            "Priority support",
          ],
          featured: true,
        },
        {
          name: "Business",
          m: 999,
          a: 799,
          items: [
            "Unlimited assistants",
            "Unlimited messages",
            "SLA & onboarding",
          ],
        },
      ],
      popular: "Popular",
    },
    footer: {
      clevio: "Clevio",
      dukungan: "Support",
      perusahaan: "Company",
      legal: "Legal",
      links: {
        solusi: "Solutions",
        cara: "How it works",
        harga: "Pricing",
        faq: "FAQ",
        kontak: "Contact us",
        status: "System status",
        tentang: "About",
        karier: "Careers",
        hubungi: "Contact",
        privasi: "Privacy",
        ketentuan: "Terms",
        keamanan: "Security",
      },
      copyright: "Made in Indonesia.",
      systems: "All systems normal",
    },
  },
};

function LangSwitch({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="inline-flex items-center border border-ink-200 rounded-full p-0.5 text-[11px]">
      {(["id", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-0.5 rounded-full transition uppercase tracking-wider ${
            lang === l
              ? "bg-ink-900 text-white"
              : "text-ink-500 hover:text-ink-900"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Landing() {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("clevio_lang") as Lang) || "id",
  );
  useEffect(() => {
    localStorage.setItem("clevio_lang", lang);
  }, [lang]);

  useEffect(() => {
    document.body.dataset.landing = "true";
    return () => {
      delete document.body.dataset.landing;
    };
  }, []);

  const t = COPY[lang];
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="min-h-screen bg-white text-ink-900">
      {/* PRICING */}
      <section
        id="harga"
        className="snap-section bg-ink-50 border-y border-ink-100"
      >
        <div className="max-w-[1000px] mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-8">
            <p className="text-[13px] tracking-[0.18em] uppercase text-[#0071e3] font-medium">
              {t.pricing.eyebrow}
            </p>
            <h2
              className="mt-3 font-semibold tracking-[-0.02em] leading-[1.05]"
              style={{ fontSize: "clamp(34px, 5vw, 52px)" }}
            >
              {t.pricing.title}
            </h2>
            <p className="mt-4 text-[19px] text-ink-500">{t.pricing.sub}</p>
          </div>
          <div className="flex justify-center mt-4 mb-12">
            <div className="inline-flex border border-ink-200 rounded-full p-1 bg-white gap-0.5">
              {(["monthly", "annual"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className="px-5 py-2 rounded-full text-[13px] transition-all"
                  style={
                    billing === b
                      ? { background: "#0071e3", color: "#fff" }
                      : { color: "#424245" }
                  }
                >
                  {b === "monthly" ? t.pricing.monthly : t.pricing.annual}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {t.pricing.plans.map((p) => {
              const price = billing === "monthly" ? p.m : p.a;
              return (
                <div
                  className={`relative rounded-[20px] p-9 h-full flex flex-col bg-white border transition-all hover:-translate-y-1 ${
                    p.featured
                      ? "border-[#0071e3] shadow-[0_0_0_1px_#0071e3]"
                      : "border-ink-100"
                  }`}
                  style={{
                    boxShadow: p.featured
                      ? "0 0 0 1px #0071e3, 0 1px 2px rgba(0,0,0,0.04), 0 12px 32px -16px rgba(10,37,64,0.14)"
                      : undefined,
                  }}
                >
                  {p.featured && (
                    <span className="absolute -top-[12px] left-1/2 -translate-x-1/2 text-[11px] tracking-[0.04em] font-medium bg-[#0071e3] text-white px-[14px] py-[5px] rounded-full">
                      {t.pricing.popular}
                    </span>
                  )}
                  <div className="text-[14px] text-ink-500">{p.name}</div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-[46px] font-semibold tracking-[-0.03em]">
                      {price === 0
                        ? lang === "id"
                          ? "Rp 0"
                          : "$0"
                        : lang === "id"
                          ? `Rp ${price}k`
                          : `$${price}`}
                    </span>
                    <span className="text-[14px] text-ink-400">
                      {t.pricing.per}
                    </span>
                  </div>
                  <ul className="mt-7 space-y-3.5 text-[15px] text-ink-700 flex-1">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        <span
                          className="flex-none w-5 h-5 rounded-full flex items-center justify-center mt-[1px]"
                          style={{ background: "rgba(0,113,227,0.08)" }}
                        >
                          <svg
                            viewBox="0 0 12 12"
                            className="w-3 h-3"
                            fill="none"
                            stroke="#0071e3"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2 6l3 3 5-5" />
                          </svg>
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  {/* Replace with payment button */}
                  <button
                    className="mt-8 w-full inline-flex items-center justify-center rounded-full text-[15px] font-medium py-3 transition-all"
                    style={
                      p.featured
                        ? { background: "#0071e3", color: "#fff" }
                        : {
                            border: "1px solid #d2d2d7",
                            background: "#fff",
                            color: "#1d1d1f",
                          }
                    }
                    //             onClick={        const midtransClient = require("midtrans-client");

                    // const snap = new midtransClient.Snap({
                    //   isProduction: false,
                    //   serverKey: "Mid-server-IuSzhkP1tFBuIeWDaY8h6Kow",
                    // });

                    // const parameters = {
                    //   transaction_details: {
                    //     order_id: "SUB-b117ce1b-9931-409e-b98f-8be1925c9f22-PRO_M",
                    //     gross_amount: 750000,
                    //   },
                    //   item_details: [
                    //     {
                    //       id: "PRO_M",
                    //       name: "Langganan PRO_M",
                    //       price: 750000,
                    //       quantity: 1,
                    //     },
                    //   ],
                    //   customer_details: {
                    //     phone: "209420390823",
                    //   },
                    // };

                    // snap
                    //   .createTransaction(parameter)
                    //   .then((transaction) => {
                    //     const transactionToken = transaction.token;
                    //     console.log("transactionToken:", transactionToken);
                    //   })
                    //   .then(
                    //     (snapResponse) => {
                    //       let snapToken = snapResponse.data.token;
                    //       console.log("Retrieved snap token:", snapToken);
                    //       window.snap.embed("YOUR_SNAP_TOKEN", {
                    //         embedId: "snap-container",
                    //       });
                    //     },
                    //     (error) => {
                    //       res.send(`Fail to call API w/ error ${error}`);
                    //       console.log(error);
                    //     },
                    //   )}
                  >
                    {price === 0 ? t.pricing.startFree : t.pricing.pick}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink-50 border-t border-ink-100">
        <div className="max-w-[1000px] mx-auto px-6 py-12 text-[12px] text-ink-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10">
            <div>
              <div className="text-ink-900 font-medium mb-3">
                {t.footer.clevio}
              </div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#solusi"
                    className="hover:text-ink-900 transition-colors"
                  >
                    {t.footer.links.solusi}
                  </a>
                </li>
                <li>
                  <a
                    href="#cara"
                    className="hover:text-ink-900 transition-colors"
                  >
                    {t.footer.links.cara}
                  </a>
                </li>
                <li>
                  <a
                    href="#harga"
                    className="hover:text-ink-900 transition-colors"
                  >
                    {t.footer.links.harga}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-ink-900 font-medium mb-3">
                {t.footer.dukungan}
              </div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#faq"
                    className="hover:text-ink-900 transition-colors"
                  >
                    {t.footer.links.faq}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-ink-900 transition-colors">
                    {t.footer.links.kontak}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-ink-900 transition-colors">
                    {t.footer.links.status}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-ink-900 font-medium mb-3">
                {t.footer.perusahaan}
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-ink-900 transition-colors">
                    {t.footer.links.tentang}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-ink-900 transition-colors">
                    {t.footer.links.karier}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-ink-900 transition-colors">
                    {t.footer.links.hubungi}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-ink-900 font-medium mb-3">
                {t.footer.legal}
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-ink-900 transition-colors">
                    {t.footer.links.privasi}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-ink-900 transition-colors">
                    {t.footer.links.ketentuan}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-ink-900 transition-colors">
                    {t.footer.links.keamanan}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-ink-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
            <div>
              © {new Date().getFullYear()} Clevio. {t.footer.copyright}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
              {t.footer.systems}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
