import React, { useState } from "react";
import { Send, Check, Mail, Phone, MapPin } from "lucide-react";
import SectionHead from "../common/SectionHead";

export default function Contact({ showToast }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [attachment, setAttachment] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment({ name: file.name, data: reader.result.split(",")[1] });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          attachment,
        }),
      });

      if (res.ok) {
        setStatus("success");
        showToast("TRANSMISSION SUCCESSFUL");
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error("Server contact error details:", errorData);
        setStatus("fallback");
        showToast("UPLINK COMPROMISED");
      }
    } catch (err) {
      console.warn(err);
      setStatus("fallback");
      showToast("CLIENT UPLINK ROUTE");
    }
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 max-w-[1180px] mx-auto relative"
    >
      <SectionHead tag="comms.uplink" title="ESTABLISH CHANNEL" />
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-6 items-start">
        <div className="bg-[var(--card)] border border-[var(--border)] backdrop-blur-md [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))]">
          <div className="flex items-center gap-3.5 py-3 px-5 border-b border-neon-cyan/10 bg-neon-cyan/5">
            <span className="font-mono text-[0.62rem] tracking-wider text-[var(--muted)]">
              SECURE_UPLINK_TERMINAL
            </span>
          </div>
          <div className="p-6 md:p-8">
            {status === "success" ? (
              <div className="text-center py-6">
                <div className="w-[70px] h-[70px] mx-auto mb-4 grid place-items-center text-neon-green bg-neon-green/5 border border-neon-green/30 rounded-full shadow-[inset_0_0_12px_rgba(57,255,136,0.15)] filter drop-shadow-[0_0_12px_rgba(57,255,136,0.4)]">
                  <Check size={30} />
                </div>
                <h4 className="font-display text-sm tracking-wide text-neon-green mb-2">
                  TRANSMISSION DELIVERED
                </h4>
                <p className="font-mono text-[0.68rem] text-[var(--muted)] font-semibold">
                  Decrypted packet transmitted directly to server deck.
                </p>
              </div>
            ) : status === "fallback" ? (
              <div className="text-center py-6">
                <div className="w-[70px] h-[70px] mx-auto mb-4 grid place-items-center text-neon-pink bg-neon-pink/5 border border-neon-pink/30 rounded-full shadow-[inset_0_0_12px_rgba(255,45,120,0.15)] filter drop-shadow-[0_0_12px_rgba(255,45,120,0.4)]">
                  <Check size={30} />
                </div>
                <h4 className="font-display text-sm tracking-wide text-neon-pink mb-2">
                  API OFFLINE · FALLBACK ENABLED
                </h4>
                <p className="font-mono text-[0.68rem] text-[var(--muted)] mb-4 font-semibold">
                  Authorize mail client launch to finalize transmission:
                </p>
                <a
                  href={`mailto:bpatil.00001@gmail.com?subject=Uplink from ${form.name}&body=${encodeURIComponent(form.message)}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-neon-purple/20 border border-neon-purple/55 text-white font-mono text-[0.66rem] tracking-widest hover:bg-neon-purple/45 transition-all duration-300 [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] cursor-pointer"
                >
                  AUTHORIZE TRANSMIT
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  ["name", "sender.identity", "INPUT IDENTIFIER"],
                  ["email", "sender.frequency", "INPUT EMAIL"],
                ].map(([key, label, placeholder]) => (
                  <div key={key}>
                    <label className="block font-mono text-[0.6rem] tracking-[0.22em] text-neon-cyan mb-2 uppercase">
                      {label}
                    </label>
                    <input
                      required
                      type={key === "email" ? "email" : "text"}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      className="w-full py-3.5 px-4 bg-[var(--surface)] border border-[var(--border)] focus:border-neon-cyan focus:shadow-[0_0_16px_rgba(0,240,255,0.2)] text-[var(--text)] outline-none [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))] transition-all duration-200"
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-mono text-[0.6rem] tracking-[0.22em] text-neon-cyan mb-2 uppercase">
                    packet.payload
                  </label>
                  <textarea
                    required
                    placeholder="WRITE ENCRYPTED MESSAGE..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full min-h-[100px] py-3.5 px-4 bg-[var(--surface)] border border-[var(--border)] focus:border-neon-cyan focus:shadow-[0_0_16px_rgba(0,240,255,0.2)] text-[var(--text)] outline-none [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))] transition-all duration-200 resize-none"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    onChange={handleFile}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="block text-center py-3.5 px-4 bg-[var(--surface)] border border-[var(--border)] hover:border-neon-cyan hover:text-neon-cyan font-mono text-[0.64rem] tracking-wider cursor-pointer [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))] transition-all duration-200 text-[var(--muted)]"
                  >
                    {attachment
                      ? `ATTACHED: ${attachment.name}`
                      : "ATTACH PAYLOAD FILE"}
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-blue hover:shadow-[0_0_34px_rgba(0,240,255,0.5)] hover:-translate-y-[2px] transition-all duration-300 font-display text-[0.72rem] font-bold tracking-widest text-[#02030a] [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))] shadow-[0_0_22px_rgba(0,240,255,0.3)] cursor-pointer flex justify-center items-center gap-2"
                >
                  <Send size={14} />{" "}
                  {status === "sending" ? "TRANSMITTING..." : "TRANSMIT PACKET"}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="grid gap-[22px]">
          <div className="p-6 bg-[var(--card)] border border-[var(--border)] backdrop-blur-md [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]">
            <div className="font-mono text-[0.62rem] tracking-[0.26em] text-neon-cyan mb-4.5 flex items-center gap-2">
              DIRECT FQS <div className="flex-1 h-[1px] bg-neon-cyan/10" />
            </div>
            <div className="space-y-2">
              {[
                [
                  Mail,
                  "bpatil.00001@gmail.com",
                  "mailto:bpatil.00001@gmail.com",
                ],
                [Phone, "+91 8830998568", "tel:+918830998568"],
                [MapPin, "Ulhasnagar, Maharashtra", "#"],
              ].map(([Icon, val, href], idx) => (
                <a
                  key={idx}
                  href={href}
                  className="flex items-center gap-3.5 p-2.5 hover:translate-x-1.5 hover:bg-neon-cyan/5 transition-all duration-300"
                >
                  <div className="w-[42px] h-[42px] grid place-items-center text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/20 [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]">
                    <Icon size={16} />
                  </div>
                  <div className="font-display text-[0.68rem] tracking-wider text-[var(--text)]">
                    {val}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
