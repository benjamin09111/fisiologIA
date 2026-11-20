import * as React from 'react';
import { cookies } from 'next/headers';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { ThemeSelector } from '@/features/settings/ThemeSelector';
import { ProfileForm } from '@/features/settings/ProfileForm';
import { getCurrentUser } from '@/services/userService';
import { THEME_COOKIE_NAME } from '@/lib/theme-script';
import { themeSchema, type ThemeSchemaType } from '@/schemas/theme';

export default async function ConfiguracionPage() {
  const user = await getCurrentUser();
  const cookieStore = await cookies();
  const rawTheme = cookieStore.get(THEME_COOKIE_NAME)?.value;
  const themeResult = themeSchema.safeParse(rawTheme);
  const activeTheme: ThemeSchemaType = themeResult.success ? themeResult.data : 'lavanda';

  return (
    <div className="space-y-8">
      <PageHeader
        title="Configuración"
        subtitle="Gestiona tu perfil, preferencias de estudio y paleta de colores"
        breadcrumbs={[{ label: 'Inicio', href: '/inicio' }, { label: 'Configuración' }]}
      />

      <div className="space-y-8">
        {/* Profile Card */}
        <Card className="p-6 md:p-8">
          <h2 className="mb-4 text-lg font-bold text-text">Información personal</h2>
          <ProfileForm user={user} />
        </Card>

        {/* Theme Palette Selector Card */}
        <Card className="p-6 md:p-8">
          <ThemeSelector currentTheme={activeTheme} />
        </Card>
      </div>
    </div>
  );
}
