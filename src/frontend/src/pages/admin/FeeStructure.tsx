import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type FeeStructureItem, feeStructure } from "@/data/mockFees";
import { formatCurrency } from "@/utils/formatCurrency";
import { Check, Pencil, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export function FeeStructure() {
  const [items, setItems] = useState<FeeStructureItem[]>(feeStructure);
  const [editId, setEditId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");

  const startEdit = (item: FeeStructureItem) => {
    setEditId(item.id);
    setEditAmount(String(item.amount));
  };
  const saveEdit = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, amount: Number(editAmount) } : i)),
    );
    setEditId(null);
    toast.success("Fee amount updated");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Fee Structure
          </h1>
          <p className="text-muted-foreground text-sm">
            Class-wise fee configuration
          </p>
        </div>
        <Button
          data-ocid="fee_structure.add.button"
          size="sm"
          onClick={() => toast.info("Add Fee Head form coming soon")}
        >
          <Plus size={16} className="mr-2" /> Add Fee Head
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                Fee Head
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                Class
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                Frequency
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr
                data-ocid={`fee_structure.item.${i + 1}`}
                key={item.id}
                className="border-b border-border last:border-0 hover:bg-muted/30"
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {item.head}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Class {item.class}
                </td>
                <td className="px-4 py-3">
                  {editId === item.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="w-24 h-7 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => saveEdit(item.id)}
                        className="text-success hover:text-success/80"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditId(null)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <span className="font-semibold text-foreground">
                      {formatCurrency(item.amount)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      item.frequency === "Monthly"
                        ? "bg-blue-100 text-blue-700"
                        : item.frequency === "Annual"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {item.frequency}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {item.category}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    data-ocid="fee_structure.edit.button"
                    onClick={() => startEdit(item)}
                    className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"
                  >
                    <Pencil size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
          <h4 className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
            Late Fine Configuration
          </h4>
          <p className="text-amber-600 dark:text-amber-400 text-sm mt-2">
            ₹10/day after 10th of month
          </p>
          <p className="text-amber-600 dark:text-amber-400 text-xs mt-1">
            Grace period: 0 days
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
          <h4 className="font-semibold text-green-800 dark:text-green-300 text-sm">
            Fee Concessions
          </h4>
          <p className="text-green-600 dark:text-green-400 text-sm mt-2">
            SC/ST: 50% on tuition
          </p>
          <p className="text-green-600 dark:text-green-400 text-xs mt-1">
            EWS: 25% on tuition
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
            Staff Ward Discount
          </h4>
          <p className="text-blue-600 dark:text-blue-400 text-sm mt-2">
            100% on tuition fee
          </p>
          <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">
            All fee heads included
          </p>
        </div>
      </div>
    </div>
  );
}
