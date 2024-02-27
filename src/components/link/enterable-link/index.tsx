import { ComponentPropsWithoutRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { Link } from '@/components/common/link';

import PressEnter from '@/components/press-enter/press-enter';
import { useLanguageContext } from '@/hooks/use-language/language-context';
import { LanguagesContents } from '@/hooks/use-language/type';

export const EnterableLink = ({
  url,
  contents,
  ...rest
}: { url: string; contents: LanguagesContents<string> } & ComponentPropsWithoutRef<'a'>) => {
  const navigate = useNavigate();
  const { lang, langParams } = useLanguageContext();

  return (
    <>
      <Link to={`${url}?${langParams}`} {...rest}>
        {contents[lang] ?? contents.en} {/* params 잘못 입력할 경우 대비 처리 */}
      </Link>
      <PressEnter enterCallback={() => navigate(`${url}?${langParams}`)} />
    </>
  );
};
