import styled from '@emotion/styled';

import { SelectOption } from '@/spreadsheet-import/types';

import { MatchColumnSelect } from '../../../components/Selects/MatchColumnSelect';
import { useRsi } from '../../../hooks/useRsi';
import type {
  MatchedOptions,
  MatchedSelectColumn,
  MatchedSelectOptionsColumn,
} from '../MatchColumnsStep';
import { getFieldOptions } from '../utils/getFieldOptions';

const Container = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  padding-left: ${({ theme }) => theme.spacing(2)};
`;

const SelectLabel = styled.span`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(1)};
`;

interface Props<T> {
  option: MatchedOptions<T> | Partial<MatchedOptions<T>>;
  column: MatchedSelectColumn<T> | MatchedSelectOptionsColumn<T>;
  onSubChange: (val: T, index: number, option: string) => void;
}

export const SubMatchingSelect = <T extends string>({
  option,
  column,
  onSubChange,
}: Props<T>) => {
  const { translations, fields } = useRsi<T>();
  const options = getFieldOptions(fields, column.value) as SelectOption[];
  const value = options.find((opt) => opt.value == option.value);

  return (
    <Container>
      <SelectLabel>{option.entry}</SelectLabel>
      <MatchColumnSelect
        value={value}
        placeholder={translations.matchColumnsStep.subSelectPlaceholder}
        onChange={(value) =>
          onSubChange(value?.value as T, column.index, option.entry!)
        }
        options={options}
        name={option.entry}
      />
    </Container>
  );
};
