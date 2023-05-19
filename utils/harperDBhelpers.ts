export async function updateAnonymousUserUsage(ip: string) {
  //Update API CALLS
  const response = await fetch("/api/trial/save", {
    method: "POST",
    // cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userIP: ip,
    }),
  })
  return response.json()
}

export async function getAnonymousUserUsage(ip: string) {
  //Update API CALLS
  const response = await fetch("/api/trial/get", {
    method: "POST",
    // cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userIP: ip,
    }),
  })
  return response.json()
}
