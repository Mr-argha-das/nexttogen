import { Users, Plus } from "lucide-react";
import { listSubscribers } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/ui";
import { addSubscriberAction, deleteSubscriberAction } from "@/app/admin/actions";

export default function AdminSubscribersPage() {
  const subscribers = listSubscribers();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Subscribers</h1>
        <p className="mt-1 text-[13.5px] text-slate-600">
          {subscribers.length} log newsletter ke liye subscribe kar chuke hain. Batch updates aur career tips bhejne ke liye
          in emails ka use karein.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="card overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-canvas text-[11.5px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">#</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Subscribe date</th>
                <th className="px-5 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subscribers.map((subscriber, index) => (
                <tr key={subscriber.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 text-slate-400">{index + 1}</td>
                  <td className="px-5 py-3 font-medium text-ink">{subscriber.email}</td>
                  <td className="px-5 py-3 text-slate-500">{formatDate(subscriber.createdAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end">
                      <DeleteButton action={deleteSubscriberAction} id={subscriber.id} label="" confirmText="Unsubscribe kar dein?" />
                    </div>
                  </td>
                </tr>
              ))}
              {!subscribers.length ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-slate-500">
                    <Users className="mx-auto h-8 w-8 text-slate-300" />
                    <p className="mt-3 text-[13.5px]">Abhi koi subscriber nahi hai.</p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="card p-5">
          <h2 className="font-heading text-[15px] font-bold">Manually add karein</h2>
          <p className="mt-2 text-[12.5px] text-slate-600">
            Offline counselling me aaye students ko newsletter list me add kar sakte hain.
          </p>
          <form action={addSubscriberAction} className="mt-3 space-y-3">
            <input name="email" type="email" required placeholder="student@email.com" className="field" />
            <button type="submit" className="btn btn-primary w-full">
              <Plus className="h-4 w-4" /> Add subscriber
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
