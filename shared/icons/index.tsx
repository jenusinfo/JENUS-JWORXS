import Sider01 from './svg/sider-01';
import Sider02 from './svg/sider-02';
import Sider03 from './svg/sider-03';
import Sider04 from './svg/sider-04';
import Sider05 from './svg/sider-05';
import Sider06 from './svg/sider-06';
import LockOpen from './svg/lock-open';
import LockClose from './svg/lock-close';
import Box from './svg/box';

export type IconType =
  | 'sider01'
  | 'sider02'
  | 'sider03'
  | 'sider04'
  | 'sider05'
  | 'sider06'
  | 'lock-open'
  | 'lock-close'
  | 'box'


const iconsMap = {
  ['sider01']: ({fill}: {fill?: string}) => <Sider01 fill={fill} />,
  ['sider02']: ({fill}: {fill?: string}) => <Sider02 fill={fill} />,
  ['sider03']: ({fill}: {fill?: string}) => <Sider03 fill={fill} />,
  ['sider04']: ({fill}: {fill?: string}) => <Sider04 fill={fill} />,
  ['sider05']: ({fill}: {fill?: string}) => <Sider05 fill={fill} />,
  ['sider06']: ({fill}: {fill?: string}) => <Sider06 fill={fill} />,
  ['lock-open']: ({fill}: {fill?: string}) => <LockOpen fill={fill} />,
  ['lock-close']: ({fill}: {fill?: string}) => <LockClose fill={fill} />,
  ['box']: ({fill}: {fill?: string}) => <Box fill={fill} />,
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
