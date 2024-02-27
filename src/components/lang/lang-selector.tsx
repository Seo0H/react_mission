import { languageOptionContents } from '@/components/lang/constants';
import { isLanguageOptions, useLanguage } from '@/hooks/use-language/use-language';

/**
 * 전역적인 언어 선택을 지원하는 언어 선택기.
 */
export const LanguageSelector = () => {
  const { handleLanguageChange } = useLanguage();

  const handelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isLanguageOptions(e.target.value)) handleLanguageChange(e.target.value);
  };

  return (
    <select name='languages' onChange={handelChange}>
      <option value=''>언어 선택</option>
      {languageOptionContents.map(({ key, value, visual }) => (
        <option key={key} value={value}>
          {visual}
        </option>
      ))}
    </select>
  );
};
