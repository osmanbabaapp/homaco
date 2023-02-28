export const setupFormData = (values) => {
  values?.confirmPassword && delete values?.confirmPassword
  values?.check && delete values?.check
  const formData = new FormData()
  // loop through object
  for (const key in values) {
    if (
      key === 'city' ||
      key === 'country' ||
      key === 'town' ||
      key === 'district' ||
      key === 'quarter'
    ) {
      formData.append(key, values[key]?.split('(')?.at(0))
    } else {
      formData.append(key, values[key])
    }
  }

  return formData
}
