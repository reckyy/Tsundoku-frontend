import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import DeleteUserConfirmModal from '@/components/modal/DeleteUserConfirmModal';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

const RAILS_API_URL = process.env.STORYBOOK_NEXT_PUBLIC_RAILS_API_URL;

const mockSession: Session = {
  user: {
    id: '1',
    name: 'Test User',
    email: 'testuser@example.com',
    accessToken: 'hogehoge',
  },
  expires: '2025-12-31T23:59:59.999Z',
};

const meta: Meta<typeof DeleteUserConfirmModal> = {
  component: DeleteUserConfirmModal,
  decorators: [
    (Story) => (
      <SessionProvider session={mockSession}>
        <Story />
      </SessionProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    close: () => {
      console.log('モーダルを閉じました。');
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeleteUserConfirmModal>;

export const AppearenceTest: Story = {
  args: {},
};

export const DeleteUserTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button', { name: '削除' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        canvas.getByText('アカウントを削除しました。'),
      ).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.delete(`${RAILS_API_URL}/users/1`, () => {
          return new HttpResponse(null, { status: 204 });
        }),
      ],
    },
  },
};

export const DeleteUserFailedTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button', { name: '削除' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.getByText('退会に失敗しました。')).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.delete(`${RAILS_API_URL}/users/1`, () => {
          return new HttpResponse('failed', { status: 420 });
        }),
      ],
    },
  },
};
