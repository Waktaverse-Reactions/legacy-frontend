import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'

// Define the mapping of tags to genres
const tagGenres = {
  WAK: ['우왁굳'],
  ISEDOL: ['아이네', '징버거', '릴파', '주르르', '고세구', '비챤'],
  GOMEM: [
    '뢴트게늄',
    '해루석',
    '소피아',
    '프리터',
    '캘리칼리데이비슨',
    '비밀소녀',
    '이덕수할아바이',
    '비즈니스킴',
    '하쿠0089',
    '독고혜지',
    '도파민박사',
    '카르나르융터르',
    '히키킹',
    '풍신',
    '곽춘식',
    '권민',
    '김치만두번영택사스가',
    '노스페라투호드',
    '단답벌레',
    '부정형인간',
    '왁파고',
  ],
  ACADEMY: [
    '닌닌',
    '미스발렌타인',
    '불곰',
    '시리안레인',
    '아마데우스최',
    '진희',
    '캡틴설리반',
    '사랑전도사젠투',
    '수셈이',
    '철도왕길버트',
    '미미짱짱세용',
    '빅토리',
    '데스해머쵸로키',
    '민강준',
    '스바스키나라바',
    '아이스께끼',
    '정삼품통정대부대곡',
    '크리즈',
  ],
  EVENT: ['2020-연말공모전', '2021-연말공모전', '2022-연말공모전', '2023-연말공모전', '고멤가요제'],
  // Add more genres and their respective tags as needed
}

export async function getStaticProps() {
  const tags = await getAllTags('blog')

  return { props: { tags } }
}

export default function Tags({ tags }) {
  // Categorize the tags into genres
  const categorizedTags = {}
  Object.keys(tags).forEach((tag) => {
    const genre = Object.entries(tagGenres).find(([genre, tagsInGenre]) =>
      tagsInGenre.includes(tag)
    )
    if (genre) {
      const [genreName] = genre
      if (!categorizedTags[genreName]) {
        categorizedTags[genreName] = []
      }
      categorizedTags[genreName].push({ name: tag, count: tags[tag] })
    }
  })

  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="column flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex flex-wrap">
          {Object.entries(categorizedTags).map(([genre, tagsInGenre]) => (
            <div key={genre} className="mt-4">
              <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">{genre}</h2>
              <div className="flex flex-wrap">
                {tagsInGenre.map((t) => (
                  <div key={t.name} className="mt-2 mb-2 mr-5">
                    <Tag text={t.name} />
                    <Link
                      href={`/tags/${kebabCase(t.name)}`}
                      className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                    >
                      {` (${t.count})`}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
