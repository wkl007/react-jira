import { ComponentProps, FC } from 'react'
import { Rate } from 'antd'

interface PinProps extends ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Pin: FC<PinProps> = ({ checked, onCheckedChange, ...restProps }) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  )
}

export default Pin
