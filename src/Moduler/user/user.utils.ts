import {
  adminModel,
  buyerModel,
  driverModel,
  sellerModel,
} from '../Member/member.model';

type Tidentity = 'buyer' | 'seller' | 'driver' | 'admin';

const generateId = async (identity: Tidentity) => {
  let realId: string = '';
  if (identity === 'buyer') {
    const count = await buyerModel.find({});
    const currentId = (Number(count.length) + 1).toString().padStart(4, '0');
    realId = `B-${currentId}`;
  } else if (identity === 'seller') {
    const count = await sellerModel.find({});
    const currentId = (Number(count.length) + 1).toString().padStart(4, '0');
    realId = `S-${currentId}`;
  } else if (identity === 'driver') {
    const count = await driverModel.find({});
    const currentId = (Number(count.length) + 1).toString().padStart(4, '0');
    realId = `D-${currentId}`;
  } else if (identity === 'admin') {
    const count = await adminModel.find({});
    const currentId = (Number(count.length) + 1).toString().padStart(4, '0');
    realId = `A-${currentId}`;
  }
  return realId;
};

export default generateId;
