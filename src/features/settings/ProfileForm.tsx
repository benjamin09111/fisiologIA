'use client';

import * as React from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Field } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2 } from 'lucide-react';
import type { User } from '@/schemas/user';

export interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [career, setCareer] = React.useState(user.career);
  const [isSaving, setIsSaving] = React.useState(false);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulated mock persistence
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar & Role Header */}
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <Avatar name={user.name} size="lg" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-text">{user.name}</h2>
            <Badge variant="primary">
              {user.role === 'teacher' ? 'Docente' : 'Estudiante'}
            </Badge>
          </div>
          <p className="text-xs text-muted">{user.email}</p>
        </div>
      </div>

      {/* Profile inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nombre completo">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Nombre completo"
          />
        </Field>

        <Field label="Correo institucional">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Correo institucional"
          />
        </Field>

        <Field label="Carrera">
          <Input
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            required
            aria-label="Carrera"
          />
        </Field>

        <Field label="Semestre / Nivel">
          <Input
            value="Segundo Año · Cuarto Semestre"
            readOnly
            disabled
            aria-label="Semestre o nivel"
          />
        </Field>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button type="submit" loading={isSaving}>
          Guardar cambios
        </Button>

        {savedSuccess && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Perfil actualizado exitosamente</span>
          </span>
        )}
      </div>
    </form>
  );
}
