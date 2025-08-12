const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function makeUserAdmin() {
  try {
    // Update the user with this email to be an admin
    const adminEmail = 'ariellakein@gmail.com' // Change this to your email
    
    const updatedUser = await prisma.user.update({
      where: {
        email: adminEmail
      },
      data: {
        role: 'ADMIN'
      }
    })
    
    console.log('✅ Successfully promoted user to admin:')
    console.log(`📧 Email: ${updatedUser.email}`)
    console.log(`👤 Name: ${updatedUser.name}`)
    console.log(`🔑 Role: ${updatedUser.role}`)
    console.log('')
    console.log('🎉 You can now access the admin panel at: http://localhost:3000/admin')
    
  } catch (error) {
    console.error('❌ Error promoting user to admin:', error)
    
    if (error.code === 'P2025') {
      console.log('🔍 User not found. Available users:')
      const users = await prisma.user.findMany({
        select: {
          email: true,
          name: true,
          role: true
        }
      })
      console.table(users)
    }
  } finally {
    await prisma.$disconnect()
  }
}

makeUserAdmin()
