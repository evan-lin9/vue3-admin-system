import { ref, onMounted } from 'vue'
import { fetchOfficerList } from '../api'

export default function useUserRepositories() {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchOfficerList()
  }

  onMounted(getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
