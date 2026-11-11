import { useParams } from 'react-router'
import { PagePlaceholder } from '@/components/shared/PagePlaceholder'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  return <PagePlaceholder index="04 / Projet" title={`Projet : ${slug}`} phase="Phase 4" />
}
