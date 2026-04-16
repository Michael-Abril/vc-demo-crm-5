'use client';

import { useState } from 'react';
import { DataTable, EmptyState } from '@varity-labs/ui-kit';
import { Button, Input, Dialog, useToast } from '@varity-labs/ui-kit';
import { useInvestors } from '@/lib/hooks';
import type { Investor } from '@/types';
import { Plus } from 'lucide-react';

const EMPTY_FORM = { name: '', firm: '', email: '', investmentAmount: 0, stage: '', lastContact: '' };

export default function InvestorsPage() {
  const toast = useToast();
  const { data: items, loading, error, create, remove, refresh } = useInvestors();

  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate() {
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    if (!form.firm.trim()) { toast.error('Firm is required'); return; }
    if (!form.email.trim()) { toast.error('Email is required'); return; }
    if (!form.stage.trim()) { toast.error('Stage is required'); return; }
    if (!form.lastContact.trim()) { toast.error('Last Contact is required'); return; }
    setSubmitting(true);
    try {
      await create(form as Omit<Investor, 'id' | 'createdAt' | 'updatedAt'>);
      toast.success('Investor created');
      setCreateOpen(false);
      setForm(EMPTY_FORM);
    } catch {
      toast.error('Failed to create investor');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await remove(id);
      toast.success('Investor deleted');
    } catch {
      toast.error('Failed to delete');
    }
  }

  const columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'firm', header: 'Firm', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'investmentAmount', header: 'Investment Amount', sortable: true },
    { key: 'stage', header: 'Stage', sortable: true },
    { key: 'lastContact', header: 'Last Contact', sortable: true },
    {
      key: 'actions',
      header: '',
      render: (_: unknown, row: Investor) => (
        <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-800 text-sm">
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Investors</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your investors.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)} icon={<Plus className="h-4 w-4" />}>
          New Investor
        </Button>
      </div>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} title="Create Investor">
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} />
          <Input label="Firm" value={form.firm} onChange={(e) => setForm(prev => ({ ...prev, firm: e.target.value }))} />
          <Input label="Email" value={form.email} onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} />
          <Input label="Investment Amount" type="number" value={String(form.investmentAmount)} onChange={(e) => setForm(prev => ({ ...prev, investmentAmount: Number(e.target.value) }))} />
          <Input label="Stage" value={form.stage} onChange={(e) => setForm(prev => ({ ...prev, stage: e.target.value }))} />
          <Input label="Last Contact" value={form.lastContact} onChange={(e) => setForm(prev => ({ ...prev, lastContact: e.target.value }))} />
          <Button onClick={handleCreate} loading={submitting}>Create</Button>
        </div>
      </Dialog>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">Failed to load investors.</p>
          <button onClick={refresh} className="text-sm text-red-700 underline">Retry</button>
        </div>
      )}

      {!loading && items.length === 0 ? (
        <EmptyState
          title="No investors yet"
          description="Create your first investor."
          action={{ label: 'Create Investor', onClick: () => setCreateOpen(true) }}
        />
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <DataTable columns={columns} data={items} loading={loading} pagination pageSize={10} hoverable />
        </div>
      )}
    </div>
  );
}
