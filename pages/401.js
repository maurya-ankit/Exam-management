import { useRouter } from 'next/router';
import React from 'react';

function Error401() {
  const router = useRouter();
  const { type } = router.query;
  return (
    <React.Fragment>
      <h1>401 {type}</h1>
    </React.Fragment>
  );
}

export default Error401;
