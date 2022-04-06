import Link from 'next/link';
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

function CustomBreadcrumb({ items }) {
  const previous = items.slice(0, -1);
  const active = items[items.length - 1];
  return (
    <div>
      <Breadcrumb>
        {previous.map((element, index) => (
          <BreadcrumbItem key={index}>
            <Link href={element.link}>{element.label}</Link>
          </BreadcrumbItem>
        ))}
        <BreadcrumbItem active>{active.label}</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}

export default CustomBreadcrumb;
