import Link from "next/link";
import { HandHeart, Inbox, Mail, Phone } from "lucide-react";
import { listMessages } from "@/lib/data";
import { cn, formatDate, formatINR, relativeTime } from "@/lib/utils";
import { DeleteButton, StatusPill } from "@/components/admin/ui";
import { deleteMessageAction, updateMessageAction } from "@/app/admin/actions";

const TYPES = [
  { key: "ALL", label: "All" },
  { key: "CONTACT", label: "Contact" },
  { key: "SUPPORT", label: "Support / Donation" },
  { key: "PARTNER", label: "Partner / CSR" },
];

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const type = params.type ?? "ALL";
  const messages = listMessages({ type });
  const all = listMessages();
  const supportTotal = all
    .filter((message) => message.type === "SUPPORT")
    .reduce((sum, message) => sum + (message.amount ?? 0), 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Messages & enquiries</h1>
          <p className="mt-1 text-[13.5px] text-slate-600">
            {all.length} total · {all.filter((message) => message.status === "NEW").length} naye · Support pledges{" "}
            {formatINR(supportTotal)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((item) => (
            <Link
              key={item.key}
              href={item.key === "ALL" ? "/admin/messages" : `/admin/messages?type=${item.key}`}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold",
                type === item.key
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-300",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-heading text-[15px] font-bold text-ink">{message.name}</h2>
                  <StatusPill status={message.status} />
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700">
                    {message.type}
                  </span>
                  {message.amount ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                      <HandHeart className="h-3 w-3" /> {formatINR(message.amount)}
                    </span>
                  ) : null}
                  <span className="text-[11.5px] text-slate-400">
                    {relativeTime(message.createdAt)} · {formatDate(message.createdAt)}
                  </span>
                </div>
                {message.subject ? (
                  <p className="mt-1.5 text-[13px] font-semibold text-slate-700">{message.subject}</p>
                ) : null}
                <p className="mt-2 whitespace-pre-line text-[13px] leading-6 text-slate-600">{message.message}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-slate-600">
                  <a href={`mailto:${message.email}`} className="flex items-center gap-1.5 hover:text-brand-700">
                    <Mail className="h-3.5 w-3.5" /> {message.email}
                  </a>
                  {message.phone ? (
                    <a href={`tel:${message.phone}`} className="flex items-center gap-1.5 hover:text-brand-700">
                      <Phone className="h-3.5 w-3.5" /> {message.phone}
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`mailto:${message.email}?subject=${encodeURIComponent("Re: " + (message.subject ?? "Aapki enquiry"))}`}
                  className="btn btn-primary btn-sm"
                >
                  Reply
                </a>
                {message.phone ? (
                  <a
                    href={`https://wa.me/${message.phone.replace(/[^\d]/g, "").slice(-10).padStart(12, "91")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    WhatsApp
                  </a>
                ) : null}
              </div>
            </div>

            <form action={updateMessageAction} className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
              <input type="hidden" name="id" value={message.id} />
              <div>
                <label className="label" htmlFor={`status-${message.id}`}>
                  Status
                </label>
                <select id={`status-${message.id}`} name="status" defaultValue={message.status} className="field">
                  {["NEW", "READ", "REPLIED"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-outline btn-sm mt-5">
                Update
              </button>
              <div className="mt-5">
                <DeleteButton
                  action={deleteMessageAction}
                  id={message.id}
                  label=""
                  confirmText={`Delete the message from ${message.name}?`}
                />
              </div>
            </form>
          </div>
        ))}

        {!messages.length ? (
          <div className="card p-10 text-center">
            <Inbox className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-3 font-heading text-base font-bold">No messages yet</p>
            <p className="mt-1 text-[13px] text-slate-500">Messages submitted through the contact form appear here.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
