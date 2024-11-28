'use client';

import { useState } from 'react';
import BookItem from './BookItem';
import {
  Grid,
  GridCol,
  Space,
  Center,
  Text,
  SegmentedControl,
} from '@mantine/core';
import { UserBook, Filter } from '@/types/index';
import { useMediaQuery } from '@mantine/hooks';

export type BookItemsProps = {
  bookItems: Record<Filter, UserBook[]>;
  isPublic: boolean;
};

const BookItems = ({ bookItems, isPublic }: BookItemsProps) => {
  const isLargeScreen = useMediaQuery('(min-width: 48em)');
  const [filter, setFilter] = useState<Filter>('unread_books');
  const emptyMessages: Record<Filter, string> = {
    unread_books: '「本を追加」から読む本を追加しましょう！',
    reading_books: '今読んでいる本はありません。',
    finished_books: '読み終わった本はありません。',
  };

  const filteredBooks = bookItems[filter];

  return (
    <>
      <Space h={20} />
      <Grid>
        <GridCol offset={2} span={8}>
          <SegmentedControl
            color="blue"
            fullWidth
            value={filter}
            onChange={(value) => setFilter(value as Filter)}
            size={isLargeScreen ? 'md' : 'sm'}
            data={[
              { label: 'まだ読んでない', value: 'unread_books' },
              { label: ' 読んでる途中 ', value: 'reading_books' },
              { label: '全部読んだ', value: 'finished_books' },
            ]}
          />
        </GridCol>
      </Grid>
      <Space h={20} />
      {filteredBooks.length > 0 ? (
        <Grid>
          <GridCol span={12}>
            <Space h={40} />
          </GridCol>
          {filteredBooks.map((userBook: UserBook) => (
            <GridCol span={{ base: 6, sm: 4 }} key={userBook.book.id}>
              <Center>
                <BookItem book={userBook.book} isPublic={isPublic} />
              </Center>
            </GridCol>
          ))}
        </Grid>
      ) : (
        <>
          <Space h={20} />
          <Text ta="center">{emptyMessages[filter]}</Text>
        </>
      )}
    </>
  );
};

export default BookItems;
