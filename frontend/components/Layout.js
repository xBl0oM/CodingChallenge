import { useState } from 'react';
import { AppShell, Burger, Text, useMantineTheme } from '@mantine/core';

export default function Layout({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbar={
        <AppShell.Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          {/* Replace with your navigation links as needed */}
          <Text weight={500} mb="md">Navigation</Text>
          <Text component="a" href="/leads" style={{ display: 'block', marginBottom: 10 }}>Leads</Text>
          <Text component="a" href="/customers" style={{ display: 'block', marginBottom: 10 }}>Customers</Text>
          {/* You can conditionally render admin-only links here */}
        </AppShell.Navbar>
      }
      header={
        <AppShell.Header height={60} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
            <Text weight={600} size="xl">Lead Management</Text>
          </div>
        </AppShell.Header>
      }
    >
      {children}
    </AppShell>
  );
}
