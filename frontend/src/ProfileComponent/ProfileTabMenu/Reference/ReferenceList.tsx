import React from 'react';
import { Section } from '../../../StyledComponents/StyledBasicItems';
import Reference from './Reference';

class ReferenceList extends React.Component<{}> {
  reference1 = (
    <Reference
      authorName={'Jack Thompson'}
      aHomeTown={'London'}
      aHomeCountry={'England'}
      role={'meal'}
      date={'May, 2019, 4 days'}
      isPositive={true}
      text={
        'Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great!'
      }
    />
  );

  reference2 = (
    <Reference
      authorName={'Jack Thompson'}
      aHomeTown={'London'}
      aHomeCountry={'England'}
      role={'meal'}
      date={'May, 2019, 4 days'}
      isPositive={true}
      text={
        'bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great!'
      }
    />
  );

  reference3 = (
    <Reference
      authorName={'Jack Thompson'}
      aHomeTown={'London'}
      aHomeCountry={'England'}
      role={'meal'}
      date={'May, 2019, 4 days'}
      isPositive={false}
      text={
        'Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great! Lorem lorem bla bla bla Jonathan is great!'
      }
    />
  );

  render() {
    return (
      <Section>
        {this.reference1}
        {this.reference2}
        {this.reference3}
      </Section>
    );
  }
}

export default ReferenceList;
