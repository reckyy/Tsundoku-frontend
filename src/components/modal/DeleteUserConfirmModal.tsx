import { Text, Divider, Space, Button, Group } from '@mantine/core';
import { UserParams } from '@/types/index';
import useDeleteUser from '@/hooks/useDeleteUser';

export default function DeleteUserConfirmModal({
  id,
  token,
  close,
}: UserParams) {
  const { handleDeleteUser } = useDeleteUser(id, token!);

  return (
    <>
      <Text size="lg" fw={700} ta="center">
        本当に削除しますか？
      </Text>
      <Divider my="lg" />
      <Text c="dimmed" ta="center">
        アカウントを削除すると、すべてのデータが削除されます。この操作は戻すことができません。
      </Text>
      <Space h={30} />
      <Group justify="center" gap="xl">
        <Button variant="light" radius="lg" color="gray" onClick={close}>
          キャンセル
        </Button>
        <Button
          variant="light"
          radius="lg"
          color="red"
          onClick={handleDeleteUser}
        >
          削除
        </Button>
      </Group>
    </>
  );
}
