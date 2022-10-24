import DarkModeSvg from '../../assets/icons/dark-mode.svg';
import LogOutSvg from '../../assets/icons/log-out.svg';
import PlusSvg from '../../assets/icons/plus.svg';
import SearchSvg from '../../assets/icons/search.svg';
import LogoSvg from '../../assets/images/logo-icon.svg';

import {
  ContentHeader,
  Greeting,
  Note,
  NotesContent,
  NotesGrid,
  NotesWrapper,
  Sidebar
} from './Notes.elements';

const Notes = () => (
  <NotesWrapper>
    <Sidebar>
      <img src={LogoSvg} width={48} alt="" />
      <img src={PlusSvg} width={32} alt="" />
      <img src={LogOutSvg} width={32} alt="" />
    </Sidebar>
    <NotesContent>
      <ContentHeader>
        <div className="input">
          <img src={SearchSvg} alt="" />
          <input type="text" placeholder="Search Notes" />
        </div>
        <img src={DarkModeSvg} alt="" />
      </ContentHeader>
      <Greeting>
        <h1>
          Hello, <span>Loop</span>
          <span>!</span> 👋🏼
        </h1>
        <p>All your notes are here, in one place!</p>
      </Greeting>
      <NotesGrid>
        <Note>
          <div>
            This is how a Note on Note.me looks like! Very simple, clean and asthetic!his is how a
            Note on Note.me looks like! Very simple, clean and asthetic!his is how a Note on Note.me
            looks like! Very simple, clean and asthetic!his is how a Note on Note.me looks like!
            Very simple, clean and asthetic!his is how a Note on Note.me looks like! Very simple,
            clean and asthetic!his is how a Note on Note.me looks like! Very simple, clean and
            asthetic!his is how a Note on Note.me looks like! Very simple, clean and asthetic!his is
            how a Note on Note.me looks like! Very simple, clean and asthetic! 😍
          </div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
        <Note>
          <div>This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍</div>
          <p>Feb, 10 2022</p>
        </Note>
      </NotesGrid>
    </NotesContent>
  </NotesWrapper>
);

export default Notes;
