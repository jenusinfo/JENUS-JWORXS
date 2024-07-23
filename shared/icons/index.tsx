import Sider01 from './svg/sider-01';
import Sider02 from './svg/sider-02';
import Sider03 from './svg/sider-03';
import Sider04 from './svg/sider-04';
import Sider05 from './svg/sider-05';
import Sider06 from './svg/sider-06';

export type IconType =
  | 'sider01'
  | 'sider02'
  | 'sider03'
  | 'sider04'
  | 'sider05'
  | 'sider06'


const iconsMap = {
  ['sider01']: ({fill}: {fill?: string}) => <Sider01 fill={fill} />,
  ['sider02']: ({fill}: {fill?: string}) => <Sider02 fill={fill} />,
  ['sider03']: ({fill}: {fill?: string}) => <Sider03 fill={fill} />,
  ['sider04']: Sider04,
  ['sider05']: Sider05,
  ['sider06']: Sider06
};

interface SvgIconProps {
  type?: IconType;
  fill?: string
};

export const Icon = ({
    type,
    fill
}: SvgIconProps) => {

  if (!type) {
    return <></>;
  }

  const IconTemp = iconsMap[type]

  return (
    <IconTemp fill={fill} />
  )
};
