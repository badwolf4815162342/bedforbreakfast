import React from 'react';
import { Section } from '../StyledComponents/StyledBasicItems';
import { ProfileBox, StyledTabMenu, StyledUserDescription } from './ProfileComponentStyle';

class ProfileComponent extends React.Component<{}> {
  render() {
    return (
      <Section>
        <ProfileBox>
          <StyledUserDescription
            firstName={'Jonathan'}
            lastName={'Foer'}
            age={'26'}
            gender={'male'}
            pRating={7}
            nRating={1}
            status={'Accepting guests'}
            description={
              'I am a famous novelist, best known for novels Everything is Illuminated(2002), Extremely Loud Incredibly Close (2005), and for my non-fiction work Eating Animals (2009). My most recent novel, Here I Am, was published in 2016. I teach creative writing at New York University.'
            }
            verified={true}
            homeTown={'Munich'}
            homeCountry={'Germany'}
            favFood={'Lasagna'}
          />
          <StyledTabMenu />
        </ProfileBox>
      </Section>
    );
  }
}
export default ProfileComponent;

//       'Jonathan',
//       'Foer',
//       '26',
//       'male',
//       7,
//       1,
//       'Accepting guests',
//       'I am a famous novelist, best known for novels Everything is Illuminated(2002), Extremely Loud Incredibly Close (2005), and for my non-fiction work Eating Animals (2009). My most recent novel, Here I Am, was published in 2016. I teach creative writing at New York University.',
//       true,
//       'Munich',
//       'Germany',
//       'Lasagna',
