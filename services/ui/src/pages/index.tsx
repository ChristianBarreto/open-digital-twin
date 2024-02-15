import { projects } from '../mocks/my-projects.json';
import { ProjectCard } from '@/components/general/ProjectCard';


export default function Home() {
  
  return (
    <div>
      <img
        alt="nature"
        className="h-[32rem] w-full object-cover object-center"
        src="https://m2tecnologia.eng.br/wp-content/uploads/2021/08/clp-automacao-industrial.jpg"
      />
      <div className='container flex flex-wrap py-4'>
        {projects.map((project) => (<ProjectCard key={project.id} {...project} />))}
      </div>
    </div>
  )
}