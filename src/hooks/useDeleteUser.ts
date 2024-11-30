import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { clientAxiosDelete } from '@/lib/clientAxios';
import { useSession } from 'next-auth/react';

const useDeleteUser = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteUser = async () => {
    const token = session?.user?.accessToken;
    try {
      const res = await clientAxiosDelete(`/users/${session?.user?.id}`, token);
      if (res.status === 204) {
        signOut();
        router.push('/thanks');
        router.refresh();
        toast.success('アカウントを削除しました。');
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('退会に失敗しました。');
    }
  };

  return { handleDeleteUser };
};

export default useDeleteUser;
