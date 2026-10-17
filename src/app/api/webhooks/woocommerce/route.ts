import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // WooCommerce Order payload
    const orderNumber = body.number || 'UNKNOWN'
    const customerName = (body.billing?.first_name + ' ' + body.billing?.last_name).trim() || 'Client Inconnu'
    const phone = body.billing?.phone || ''
    const address = body.billing?.address_1 || ''
    const totalPrice = parseFloat(body.total || '0')
    
    // Extract first product name
    const productName = body.line_items && body.line_items.length > 0 
      ? body.line_items[0].name 
      : 'Produit Inconnu'
    
    const quantity = body.line_items && body.line_items.length > 0 
      ? body.line_items[0].quantity 
      : 1

    await prisma.order.create({
      data: {
        orderNumber,
        storeName: 'WooCommerce Store',
        customerName,
        phone,
        address,
        productName,
        quantity,
        totalPrice,
        status: 'PENDING'
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook Error:', error)
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 })
  }
}