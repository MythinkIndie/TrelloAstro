
type HTMLCustomClass = {
    myClass: string;
}

export default function MoreVerticalIcon({myClass}: HTMLCustomClass) {

  return (
    <svg className={myClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
    </svg>

  )

}